import { json } from '@remix-run/cloudflare';
import type { LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

interface Env {
  DB: D1Database;
}

export const loader: LoaderFunction = async ({ context }) => {
  const env = context.env as Env;
  console.log("querying D1")
  // Query the D1 database
  const { results } = await env.DB.prepare(
    "SELECT * FROM users LIMIT 10"
  ).all();
  console.log("querying success")

  return json({ users: results });
};

export default function Index() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix with Cloudflare Workers and D1</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
