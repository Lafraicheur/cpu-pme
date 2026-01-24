import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com/api';

function buildTargetUrl(pathSegments: string[], searchParams: URLSearchParams) {
  const base = API_BASE_URL.replace(/\/$/, '');
  const path = pathSegments.join('/');
  const url = new URL(`${base}/${path}`);
  // Repasser la querystring telle quelle
  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  try {
    const params = await context.params;
    const segments = params?.path || [];
    const target = buildTargetUrl(segments, request.nextUrl.searchParams);

    const upstream = await fetch(target, {
      method: 'GET',
      headers: { 'Accept': '*/*' },
      cache: 'no-store',
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '');
      return NextResponse.json(
        { error: `API returned ${upstream.status}: ${upstream.statusText}`, body: safeJson(text) },
        { status: upstream.status }
      );
    }

    // Stream JSON directement
    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ [PROXY CATCH-ALL] GET error:', error);
    return NextResponse.json({ error: 'Failed to proxy request' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  try {
    const params = await context.params;
    const segments = params?.path || [];
    const target = buildTargetUrl(segments, request.nextUrl.searchParams);
    const body = await request.text();

    const upstream = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': '*/*' },
      body: body || undefined,
      cache: 'no-store',
    });

    const text = await upstream.text().catch(() => '');
    let payload = safeJson(text);
    return NextResponse.json(payload, { status: upstream.status });
  } catch (error) {
    console.error('❌ [PROXY CATCH-ALL] POST error:', error);
    return NextResponse.json({ error: 'Failed to proxy request' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  try {
    const params = await context.params;
    const segments = params?.path || [];
    const target = buildTargetUrl(segments, request.nextUrl.searchParams);
    const body = await request.text();

    const upstream = await fetch(target, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Accept': '*/*' },
      body: body || undefined,
      cache: 'no-store',
    });

    const text = await upstream.text().catch(() => '');
    let payload = safeJson(text);
    return NextResponse.json(payload, { status: upstream.status });
  } catch (error) {
    console.error('❌ [PROXY CATCH-ALL] PATCH error:', error);
    return NextResponse.json({ error: 'Failed to proxy request' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  try {
    const params = await context.params;
    const segments = params?.path || [];
    const target = buildTargetUrl(segments, request.nextUrl.searchParams);

    const upstream = await fetch(target, {
      method: 'DELETE',
      headers: { 'Accept': '*/*' },
      cache: 'no-store',
    });

    const text = await upstream.text().catch(() => '');
    let payload = safeJson(text);
    return NextResponse.json(payload, { status: upstream.status });
  } catch (error) {
    console.error('❌ [PROXY CATCH-ALL] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to proxy request' }, { status: 500 });
  }
}

function safeJson(text: string) {
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return { raw: text };
  }
}
