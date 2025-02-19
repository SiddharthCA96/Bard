import { z } from "zod";

// Enum Validation for Transaction Type
export const TransactionTypeEnum = z.enum(["TRANSFER_TO_BANK", "TRANSFER_TO_WALLET"]);

// Enum Validation for Transaction Status
export const TransactionStatusEnum = z.enum(["PENDING", "COMPLETED", "FAILED"]);

// Schema for Bank Model
export const BankSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
});

// Schema for User Model (Partial)
export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  name: z.string(),
});

// Schema for Bank Account
export const BankAccountSchema = z.object({
  id: z.number().int().positive(),
  accountNumber: z.string(),
  userId: z.number().int().positive(),
  bankId: z.number().int().positive(),
  balance: z.number().min(0), // Balance should be non-negative
});

// Schema for Bank Transaction
export const BankTransactionSchema = z.object({
  id: z.number().int().positive(),
  transactionId: z.string(),
  amount: z.number().positive(),
  type: TransactionTypeEnum,
  status: TransactionStatusEnum,
  createdAt: z.date(),
  accountId: z.number().int().positive(),
});

//Input Schema for Creating a Bank Account
export const CreateBankAccountSchema = z.object({
  userId: z.number().int().positive(),
  bankId: z.number().int().positive(),
});

// Input Schema for Transferring Money to Bank
export const TransferToBankSchema = z.object({
  userId: z.number().int().positive(),
  amount: z.number().positive(),
});

//Input Schema for Transferring Money to Wallet
export const TransferToWalletSchema = z.object({
  userId: z.number().int().positive(),
  amount: z.number().positive(),
});

// Input Schema for Simulating a Webhook Event
export const SimulateWebhookSchema = z.object({
  transactionId: z.string(),
  eventType: TransactionTypeEnum,
  status: TransactionStatusEnum,
});

//API Response Schema for Transactions List
export const TransactionsListSchema = z.array(BankTransactionSchema);

//TypeScript Type Inference
export type Bank = z.infer<typeof BankSchema>;
export type User = z.infer<typeof UserSchema>;
export type BankAccount = z.infer<typeof BankAccountSchema>;
export type BankTransaction = z.infer<typeof BankTransactionSchema>;
export type CreateBankAccountInput = z.infer<typeof CreateBankAccountSchema>;
export type TransferToBankInput = z.infer<typeof TransferToBankSchema>;
export type TransferToWalletInput = z.infer<typeof TransferToWalletSchema>;
export type SimulateWebhookInput = z.infer<typeof SimulateWebhookSchema>;
export type TransactionsList = z.infer<typeof TransactionsListSchema>;
