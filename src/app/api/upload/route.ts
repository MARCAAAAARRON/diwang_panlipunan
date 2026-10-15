import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify admin authentication
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Kinakailangan ang pag-login upang mag-upload ng mga larawan." },
        { status: 401 }
      );
    }

    // Check admin role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const isExplicitAdmin =
      (profile && (profile as any).role === "admin") ||
      user.user_metadata?.role === "admin";

    if (!isExplicitAdmin) {
      return NextResponse.json(
        { error: "Walang administratibong pahintulot upang mag-upload ng mga file." },
        { status: 403 }
      );
    }

    // 2. Parse FormData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "diwang-panlipunan/banners";

    if (!file) {
      return NextResponse.json(
        { error: "Walang nakitang file na in-upload." },
        { status: 400 }
      );
    }

    // Validate MIME type
    const validMimes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { error: "Maling uri ng file. Tanging JPG, PNG, WebP, at AVIF lamang ang tinatanggap." },
        { status: 400 }
      );
    }

    // Validate file size (10MB ceiling for banners)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Masyadong malaki ang larawan. Hanggang 10MB lamang ang pinapayagan." },
        { status: 400 }
      );
    }

    // 3. Check Cloudinary Configuration
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          error:
            "Hindi pa naka-configure ang Cloudinary credentials sa .env.local (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET).",
          unconfigured: true,
        },
        { status: 503 }
      );
    }

    // 4. Upload Buffer to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const sanitizedBase = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const publicId = `${Date.now()}-${sanitizedBase}`;

    const result = await uploadToCloudinary(buffer, {
      folder,
      public_id: publicId,
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      provider: "cloudinary",
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    });
  } catch (err: any) {
    console.error("[api/upload] Error:", err);
    let errorMessage = err?.message || "Nagkaroon ng aberya sa pag-upload ng larawan sa Cloudinary.";

    if (err?.http_code === 403 || String(errorMessage).includes("403")) {
      errorMessage =
        "Cloudinary Permission Error: Walang pahintulot na mag-upload ang kasalukuyang API Key (kailangan ng 'create' / upload permission). Sa Cloudinary Console > Settings > Access Keys, i-enable ang 'Create/Upload' permission para sa key na ito, o gamitin ang Master API Key mula sa Dashboard.";
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
