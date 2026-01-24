"use client";

import { X, ChevronRight, Plus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import AddBankModal from "./AddBankModal";
import toast from "react-hot-toast";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  savedBank: any; // { bankName, accountNumber, accountHolder } or null
  onUpdateBank: (data: any) => Promise<void>;
  onRequestWithdrawal: (amount: number) => Promise<void>;
  isLoadingAction: boolean;
}

type Step = "INPUT" | "SELECT_BANK" | "CONFIRM" | "SUCCESS";

export default function WithdrawalModal({
  isOpen,
  onClose,
  balance,
  savedBank,
  onUpdateBank,
  onRequestWithdrawal,
  isLoadingAction,
}: WithdrawalModalProps) {
  const [step, setStep] = useState<Step>("INPUT");
  const [amount, setAmount] = useState("");
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setStep("INPUT");
      setAmount("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAmountChange = (val: string) => {
    // Only numbers
    const numeric = val.replace(/\D/g, "");
    setAmount(numeric);
  };

  const handleNext = () => {
    if (step === "INPUT") {
      const numAmount = parseInt(amount || "0", 10);
      if (numAmount < 10000) {
        toast.error("Minimal penarikan Rp 10.000");
        return;
      }
      if (numAmount > balance) {
        toast.error("Saldo tidak mencukupi");
        return;
      }
      setStep("SELECT_BANK");
    } else if (step === "SELECT_BANK") {
      if (!savedBank) {
        setIsAddBankOpen(true);
        return;
      }
      setStep("CONFIRM");
    } else if (step === "CONFIRM") {
      const numAmount = parseInt(amount || "0", 10);
      onRequestWithdrawal(numAmount).then(() => {
        setStep("SUCCESS");
      });
    }
  };

  const handleOpenBankSelection = () => {
    setStep("SELECT_BANK");
  };

  const handleBack = () => {
    if (step === "SELECT_BANK") setStep("INPUT");
    if (step === "CONFIRM") setStep("SELECT_BANK");
  };

  // Render Input Step
  const renderInputStep = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[#1E1E1E]">Tarik Dana</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="bg-[#E0F2F4] rounded-2xl p-6 text-center mb-6">
        <h2 className="text-2xl font-bold text-[#3197A5] mb-1">
          Rp {balance.toLocaleString("id-ID")}
        </h2>
        <p className="text-xs text-gray-400">Saldo yang dapat ditarik</p>
      </div>

      <div className="mb-6">
        <label className="block text-xs text-gray-400 mb-1.5 font-medium">
          Nominal Penarikan
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
            Rp
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-16 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#3197A5] transition-all"
            placeholder="Minimum Rp 10.000"
            value={amount ? parseInt(amount).toLocaleString("id-ID") : ""}
            onChange={(e) => handleAmountChange(e.target.value)}
          />
          <button
            onClick={() => setAmount(balance.toString())}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3197A5] text-xs font-bold hover:underline"
          >
            Semua
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-gray-400"></span> Transaksi
          bebas nominal Rp 10.000
        </p>
      </div>

      <div className="mb-8">
        <label className="block text-xs text-gray-400 mb-1.5 font-medium">
          Transfer ke
        </label>
        <button
          onClick={handleOpenBankSelection}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            {savedBank ? (
              <>
                <div className="w-10 h-6 bg-blue-900 rounded flex items-center justify-center text-[8px] font-bold text-white tracking-tighter overflow-hidden uppercase">
                  {savedBank.bankName}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#1E1E1E]">
                    Bank {savedBank.bankName} ••••{" "}
                    {savedBank.accountNumber.slice(-4)}
                  </p>
                </div>
              </>
            ) : (
              <span className="text-xs text-gray-400">Pilih Rekening Bank</span>
            )}
          </div>
          <ChevronRight
            size={16}
            className="text-gray-400 group-hover:text-gray-600 transition-colors"
          />
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Batal
        </button>
        <button
          onClick={handleNext}
          disabled={
            !amount || parseInt(amount) < 10000 || parseInt(amount) > balance
          }
          className="flex-1 px-4 py-2 bg-[#3197A5] text-white rounded-full text-sm font-medium hover:bg-[#288a96] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Tarik Dana
        </button>
      </div>
    </>
  );

  // Render Select Bank Step
  const renderSelectBankStep = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[#1E1E1E]">Rekening Bank</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="mb-2">
        <p className="text-xs font-bold text-[#1E1E1E] mb-4">
          Pilih Rekening Pencairan
        </p>
      </div>

      <div className="space-y-3 mb-8 max-h-[300px] overflow-y-auto">
        {/* If saved bank exists, allow selection loop or showing it. 
             Ideally there's a list, but we simulate one record for now. */}
        {savedBank && (
          <label className="flex items-center gap-3 p-4 border border-[#3197A5] bg-[#F5FBFC] rounded-2xl cursor-pointer transition-all">
            <div className="relative flex items-center justify-center w-5 h-5">
              <input
                type="radio"
                checked
                readOnly
                className="peer appearance-none w-4 h-4 border border-gray-300 rounded-full checked:border-[#3197A5] checked:border-4 transition-all"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1E1E1E]">
                Bank {savedBank.bankName}
              </p>
              <p className="text-xs text-gray-500">{savedBank.accountNumber}</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase">
                {savedBank.accountHolder}
              </p>
            </div>
          </label>
        )}

        {/* Add Bank Button */}
        <button
          onClick={() => setIsAddBankOpen(true)}
          className="w-full py-4 border border-dashed border-gray-300 rounded-2xl text-[#3197A5] text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Plus size={16} />
          Tambah Rekening
        </button>
      </div>

      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => setStep("INPUT")}
          className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Kembali
        </button>
        {/* If no bank selected, this would be disabled or act as 'select' */}
        {savedBank && (
          <button
            onClick={() => setStep("INPUT")} // Go back to input with selected bank
            className="flex-1 px-4 py-2 bg-[#3197A5] text-white rounded-full text-sm font-medium hover:bg-[#288a96] transition-colors"
          >
            Pilih
          </button>
        )}
      </div>
    </>
  );

  // Render Confirm Step
  const renderConfirmStep = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[#1E1E1E]">Konfirmasi</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 border border-gray-100 rounded-2xl mb-6">
        <div className="flex justify-between items-center text-xs mb-3">
          <span className="text-gray-400">
            Bank {savedBank?.bankName} •••• {savedBank?.accountNumber.slice(-4)}
          </span>
        </div>
        <div className="h-px bg-gray-100 my-3"></div>
        <div className="flex justify-between items-center text-xs mb-3">
          <span className="text-gray-400">Nominal Penarikan</span>
          <span className="font-bold text-[#1E1E1E]">
            Rp {parseInt(amount).toLocaleString("id-ID")},00
          </span>
        </div>
        <div className="flex justify-between items-center text-xs mb-3">
          <span className="text-gray-400">Estimasi Pencairan</span>
          <span className="font-bold text-[#1E1E1E]">1 - 3 hari kerja</span>
        </div>
        <div className="flex justify-between items-center text-xs mb-3">
          <span className="text-gray-400">Biaya Admin</span>
          <span className="font-bold text-[#1E1E1E]">-</span>
        </div>
        <div className="h-px bg-gray-100 my-3"></div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-[#1E1E1E]">Total</span>
          <span className="text-lg font-bold text-[#1E1E1E]">
            Rp {parseInt(amount).toLocaleString("id-ID")},00
          </span>
        </div>
      </div>

      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => setStep("INPUT")}
          className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Batal
        </button>
        <button
          onClick={handleNext}
          disabled={isLoadingAction}
          className="flex-1 px-4 py-2.5 bg-[#3197A5] text-white rounded-full text-sm font-medium hover:bg-[#288a96] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoadingAction ? "Memproses..." : "Konfirmasi"}
        </button>
      </div>
    </>
  );

  // Render Success Step
  const renderSuccessStep = () => (
    <div className="text-center pt-8 pb-4">
      <div className="w-16 h-16 bg-[#E0F2F4] rounded-full flex items-center justify-center mx-auto mb-6 relative">
        <div className="w-10 h-10 rounded-full border-2 border-[#3197A5] border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Check size={24} className="text-[#3197A5] hidden" />{" "}
          {/* Hidden for now to show processing state as per design image 'Penarikan sedang diproses' with clock icon? Actually image shows a clock icon not spinner. */}
          {/* Using custom Clock-like icon or mimic design */}
          <div className="w-3 h-3 bg-[#3197A5] rounded-full absolute top-3 right-3 animate-ping opacity-20"></div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-[#1E1E1E] mb-2">
        Penarikan kamu sedang diproses ⏳
      </h3>
      <p className="text-xs text-gray-400 mb-8 max-w-xs mx-auto">
        Dana akan masuk ke rekenig kamu dalam waktu maksimal 3 hari kerja.
      </p>

      <div className="bg-[#F5FBFC] rounded-xl p-4 mb-8">
        <p className="text-xs text-gray-500 mb-1">
          Bank {savedBank?.bankName} •••• {savedBank?.accountNumber.slice(-4)}
        </p>
        <p className="text-xl font-bold text-[#3197A5]">
          Rp {parseInt(amount).toLocaleString("id-ID")},00
        </p>
        <p className="text-[10px] text-gray-400 mt-1">
          {new Date().toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        Tutup
      </button>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
        <div
          className="bg-white rounded-[24px] w-full max-w-[500px] p-6 shadow-2xl relative animate-in zoom-in-95 duration-200 min-h-[400px] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {step === "INPUT" && renderInputStep()}
          {step === "SELECT_BANK" && renderSelectBankStep()}
          {step === "CONFIRM" && renderConfirmStep()}
          {step === "SUCCESS" && renderSuccessStep()}
        </div>
      </div>

      <AddBankModal
        isOpen={isAddBankOpen}
        onClose={() => setIsAddBankOpen(false)}
        onSubmit={async (data) => {
          await onUpdateBank(data);
          setIsAddBankOpen(false);
          // If coming from Input, stay on Input so user sees updated bank?
          // Or if coming from Select Bank, stay there.
          // Assuming efficient re-render, savedBank will update.
        }}
        isLoading={isLoadingAction}
      />
    </>
  );
}
