import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid Google Play email address." },
        { status: 400 }
      );
    }

    // You can also sync this to Firestore / Notion / Google Groups if configured
    console.log(`[Superfit Alpha Tester Signup]: ${email} at ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      email,
      message: "Email received! Adding to Google Play Console Closed Testing track.",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.superfit.aifitness"
    });
  } catch (error) {
    console.error("Alpha signup error:", error);
    return NextResponse.json(
      { error: "Failed to submit email. Please try again." },
      { status: 500 }
    );
  }
}
