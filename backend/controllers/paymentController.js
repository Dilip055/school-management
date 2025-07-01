import Payment from '../models/payment.model.js';
import Invoice from '../models/invoice.model.js';
import CustomError from '../utils/customError.js';

export const applyPayment = async (req, res) => {
  const { invoiceId } = req.params;
  const { amount, paymentMethod, transactionId } = req.body;

  const invoice = await Invoice.findByPk(invoiceId);
  if (!invoice) throw new CustomError("Invoice not found", 404);

  await Payment.create({
    invoiceId,
    amount,
    paymentMethod,
    transactionId,
    paymentDate: new Date(),
  });

  invoice.totalAmount = 0;
  invoice.paidAmount = amount;
  await invoice.save();

  res.status(201).json({ message: "Fee payment successful" });
};

export const getInvoicePayments = async (req, res) => {
  const { invoiceId } = req.params;

  const payments = await Payment.findAll({ where: { invoiceId } });
  if (payments.length === 0) {
    throw new CustomError("No payments found", 404);
  }

  res.status(200).json(payments);
};
