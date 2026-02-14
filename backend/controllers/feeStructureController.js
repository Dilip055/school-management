import FeesStructure from "../models/feeStructure.model.js";

export const addFeeStructure = async (req, res) => {
  const { classId, feeType, amount } = req.body;
  if (!classId || !feeType || !amount) {
    throw new Error("Missing required fields", 400);
  }

  const existing = await FeesStructure.findOne({ where: { classId, feeType } });
  if (existing) {
    throw new Error("Fee structure already exists", 400);
  }

  await FeesStructure.create({
    classId,
    feeType,
    amount,
  });

  res.status(201).json({ message: "Fee structure added" });
};

export const fetchFeeStruct = async (req, res) => {
  const Feedata = await FeesStructure.findAll();
  if (!Feedata) {
    throw new Error("Data Not found", 404);
  }
  res.status(200).json(Feedata);
};

export const deleteFeeStructure = async (req, res) => {
  const { id } = req.params;

  const feeStructure = await FeesStructure.findByPk(id);
  if (!feeStructure) {
    throw new Error("Fee structure not found", 404);
  }

  await feeStructure.destroy();

  res.status(200).json({ message: "Fee structure deleted" });
};
