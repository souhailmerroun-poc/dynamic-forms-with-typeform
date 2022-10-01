// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const headers = new Headers({
  Authorization:
    "Bearer tfp_FeYuSVCDaieJgKi2qeauL1tavD6LGDLS8tbstJWV2UqP_3pc49HaFrQxNeu",
  "Content-Type": "application/json",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(`https://api.typeform.com/forms`, {
    headers: headers,
    method: "POST",
    body: JSON.stringify({
      title: "Bienvenue sur le parcours d'inscription 365"
    }),
  });

  const data = await response.json();

  res.status(200).json({ name: 'John Doe' })
}
