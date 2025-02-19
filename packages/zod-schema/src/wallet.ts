import { z } from "zod";

// Enum Validation for Auth Type
export const AuthTypeEnum = z.enum(["Google", "Github"]);

// Enum Validation for OnRamp Status
export const OnRampStatusEnum = z.enum(["Success", "Failure", "Processing"]);

// Enum Validation for P2P Transaction Type
export const P2PTypeEnum = z.enum(["Food", "Travel", "Education", "Entertainment", "Medicine", "Telecom"]);

//  Enum Validation for P2P Transaction Status
export const P2PStatusEnum = z.enum(["Success", "Failure", "Processing"]);

// Schema for User Model
export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email().nullable(),
  name: z.string().nullable(),
  number: z.string(),
  password: z.string(),
});

//  Schema for OnRampTransaction Model
export const OnRampTransactionSchema = z.object({
  id: z.number().int().positive(),
  status: OnRampStatusEnum,
  token: z.string(),
  provider: z.string(),
  amount: z.number().positive(),
  startTime: z.date(),
  userId: z.number().int().positive(),
});

//  Schema for Balance Model
export const BalanceSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  amount: z.number().min(0),
  locked: z.number().min(0),
});

//  Schema for P2PTransactions Model
export const P2PTransactionSchema = z.object({
  id: z.number().int().positive(),
  amount: z.number().positive(),
  status: P2PStatusEnum,
  type: P2PTypeEnum,
  timestamp: z.date(),
  senderId: z.number().int().positive(),
  receiverId: z.number().int().positive(),
});
//Input Schema for Creating a P2P Transaction
export const CreateP2PTransactionSchema = z.object({
  senderId: z.number().int().positive(),
  receiverId: z.number().int().positive(),
  amount: z.number().positive(),
  type: P2PTypeEnum,
});

// Input Schema for Creating an OnRamp Transaction
export const CreateOnRampTransactionSchema = z.object({
  userId: z.number().int().positive(),
  provider: z.string(),
  amount: z.number().positive(),
});

// Input Schema for Updating a Balance
export const UpdateBalanceSchema = z.object({
  userId: z.number().int().positive(),
  amount: z.number().min(0),
  locked: z.number().min(0),
});

// API Response Schema for Transactions List
export const TransactionsListSchema = z.array(P2PTransactionSchema);

// TypeScript Type Inference
export type User = z.infer<typeof UserSchema>;
export type OnRampTransaction = z.infer<typeof OnRampTransactionSchema>;
export type Balance = z.infer<typeof BalanceSchema>;
export type P2PTransaction = z.infer<typeof P2PTransactionSchema>;
export type CreateP2PTransactionInput = z.infer<typeof CreateP2PTransactionSchema>;
export type CreateOnRampTransactionInput = z.infer<typeof CreateOnRampTransactionSchema>;
export type UpdateBalanceInput = z.infer<typeof UpdateBalanceSchema>;
export type TransactionsList = z.infer<typeof TransactionsListSchema>;
