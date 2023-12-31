import { Category } from "../../models/Category";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { name } = await req.json();

  const category = await Category.create({ name });
  return Response.json(category);
}
export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, name } = await req.json();
  await Category.updateOne({ _id }, { name });
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const categories = await Category.find();

  return Response.json(categories);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  await Category.deleteOne({ _id: id });

  return Response.json(true);
}
