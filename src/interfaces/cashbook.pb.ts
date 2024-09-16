/* eslint-disable */

export const protobufPackage = "cashbook";

export interface BranchRequest {
  branchId: number;
}

export interface CashbookApproveExpenseRequest {
  status: number;
  verifiedBy: number;
  amount: number;
  expenseId: number;
  comment: string;
}

export interface CashbookCreateExpenseRequest {
  amount: number;
  expenseTypeId: number;
  branchId: number;
  comment: string;
}

export interface ExpenseSingleResponse {
  success: boolean;
  status: number;
  message: string;
  data?: Expense | undefined;
}

export interface ExpenseRepeatedResponse {
  success: boolean;
  status: number;
  message: string;
  data: Expense[];
}

export interface Expense {
  id: number;
  userId: number;
  expenseTypeId: number;
  requestedAmount: number;
  approvedAmount: number;
  status: number;
  branchComment: string;
  adminComment: string;
  verifiedAt: string;
  verifiedBy: number;
  createdAt: string;
  balance?: number | undefined;
}

export interface CashbookApproveCashInOutRequest {
  status: number;
  cashoutId: number;
  verifiedBy: number;
}

export interface CashbookCreateCashInOutRequest {
  userId: number;
  branchId: number;
  amount: number;
  comment: string;
}

export interface CashInOutSingleResponse {
  success: boolean;
  status: number;
  message: string;
  data?: CashInOut | undefined;
}

export interface CashInOutRepeatedResponse {
  success: boolean;
  status: number;
  message: string;
  data: CashInOut[];
}

export interface CashInOut {
  id: number;
  userId: number;
  approvedBy: number;
  branchId: number;
  amount: number;
  comment: string;
  status: number;
  createdAt: string;
  balance?: number | undefined;
}

export interface CashbookCreateExpenseTypeRequest {
  title: string;
  fixed: number;
  amount: number;
}

export interface ExpenseTypeSingleResponse {
  success: boolean;
  status: number;
  message: string;
  data?: ExpenseType | undefined;
}

export interface ExpenseTypeRepeatedResponse {
  success: boolean;
  status: number;
  message: string;
  data: ExpenseType[];
}

export interface ExpenseType {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  status: number;
  fixed: number;
}

export const CASHBOOK_PACKAGE_NAME = "cashbook";
