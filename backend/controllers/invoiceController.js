import Invoice from '../models/invoice.model.js';
import User from '../models/user.model.js';
import FeeStructure from '../models/feeStructure.model.js';
import CustomError from '../utils/customError.js';

export const generateInvoice = async (req, res) => {
  const { studentId } = req.params;

  const student = await User.findByPk(studentId);
  if (!student) throw new CustomError("User not found", 404);
  if (!student.classId) throw new CustomError("Class not assigned to student", 404);

  const invoiced = await Invoice.findAll({ where: { studentId } });
  if (invoiced.length > 0) throw new CustomError("Invoice already generated", 400);

  const fees = await FeeStructure.findAll({ where: { classId: student.classId } });
  if (fees.length === 0) return res.status(400).json({ message: "No fee structure found for this class" });

  const totalAmount = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await Invoice.create({
    studentId,
    totalAmount,
    dueDate,
    status: "unpaid",
  });

  return res.status(201).json({ message: "Invoice assigned successfully" });
};

export const invoiceAll = async (req, res) => {
  const invoices = await Invoice.findAll();
  if (invoices.length === 0) {
    return res.status(404).json({ message: "No invoices found" });
  }
  return res.status(200).json(invoices);
};

export const getStudentInvoices = async (req, res) => {
  const { studentId } = req.params;

  const student = await User.findByPk(studentId);
  if (!student) throw new CustomError("Student not found", 404);

  const fees = await FeeStructure.findAll({ where: { classId: student.classId } });
  const invoices = await Invoice.findAll({ where: { studentId } });

  if (invoices.length === 0) {
    return res.status(404).json({ message: "No invoices for this student" });
  }

  return res.status(200).json({ fees, invoices });
};

export const deleteStudentInvoice = async (req, res) => {
  try {
    const { studentId } = req.params;
    const invoices = await Invoice.findAll({ where: { studentId } });

    if (invoices.length === 0) {
      return res.status(404).json({ message: "No invoices for this student" });
    }

    for (let invoice of invoices) {
      await invoice.destroy();
    }

    return res.status(200).json({ message: "Invoices deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateStudentInvoice = async (req, res) => {
  const { invoiceId } = req.params;

  const invoice = await Invoice.findOne({ where: { id: invoiceId } });
  if (!invoice) {
    throw new CustomError("No invoice found", 404);
  }

  await Invoice.update(
    {
      status: "paid",
      paidAmount: invoice.totalAmount,
      totalAmount: 0,
    },
    {
      where: { id: invoiceId },
    }
  );

  return res.status(200).json({ message: "Invoice updated successfully" });
};
