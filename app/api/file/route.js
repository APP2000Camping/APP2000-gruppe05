import { put, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  const json = await request.json();
  console.log({ json });
  await del(json.url);
  return new Response(JSON.stringify({}), { status: 200, headers: { 'Content-Type': 'application/json' } });
}


export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || "";

  if(filename){ 

    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);

  }else {
      return NextResponse.json({message: "No filename detected"});
  }
}

