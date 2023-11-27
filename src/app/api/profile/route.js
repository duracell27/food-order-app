import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "../../models/User";
import { UserInfo } from "../../models/UserInfo";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);

  const data = await req.json();
  const { name, image, streetAddress, phone, zipCode, city, country, isAdmin } =
    data;
  const session = await getServerSession(authOptions);

  const email = session.user.email;

  await User.updateOne({ email }, { name, image });
  await UserInfo.findOneAndUpdate(
    { email },
    { streetAddress, phone, zipCode, city, country, isAdmin }, {upsert: true }
  );

  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return Response.json({});
  }
  const user = await User.findOne({ email }).lean();
  const userInfo = await UserInfo.findOne({ email }).lean();

  return Response.json({ ...user, ...userInfo });
}
