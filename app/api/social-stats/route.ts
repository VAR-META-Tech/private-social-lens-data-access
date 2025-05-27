import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get the path to the social-stats.json file
    const filePath = path.join(process.cwd(), 'social-stats.json');
    
    try {
      // Read the file
      const data = await fs.readFile(filePath, 'utf8');
      const jsonData = JSON.parse(data);
      return NextResponse.json(jsonData);
    } catch (readError) {
      console.error("Error reading social-stats.json:", readError);
      
      // Return empty array if file doesn't exist
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Error in social-stats API endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 