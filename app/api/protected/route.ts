import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    console.log(decoded)

    return NextResponse.json(
      { message: "User Authenticated!", user: decoded },
      { status: 200 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { error: `Invalid token: ${error}` },
      { status: 403 }
    );
  }
}
