import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  const targetUrl = new URL(url);

  try {
    const response = await axios.get(targetUrl.toString());
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: (error as any).response?.status || 500 }
    );
  }
}

