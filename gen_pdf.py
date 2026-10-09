from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(49, 151, 165)
        self.cell(0, 8, "Sublime API Integration - Payment & Withdrawal", ln=1, align="L")
        self.set_draw_color(49, 151, 165)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)
        self.set_text_color(0, 0, 0)

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")

    def h1(self, txt):
        self.set_font("Helvetica", "B", 14)
        self.set_fill_color(49, 151, 165)
        self.set_text_color(255, 255, 255)
        self.cell(0, 8, "  " + txt, ln=1, fill=True)
        self.ln(2)
        self.set_text_color(0, 0, 0)

    def h2(self, txt):
        self.ln(2)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(49, 151, 165)
        self.cell(0, 6, txt, ln=1)
        self.set_text_color(0, 0, 0)

    def label(self, k, v):
        self.set_font("Helvetica", "B", 9)
        self.cell(22, 5, k, ln=0)
        self.set_font("Courier", "", 9)
        if v == "" or v is None:
            self.ln(5)
            return
        self.multi_cell(168, 5, v)

    def para(self, txt):
        self.set_font("Helvetica", "", 9)
        self.multi_cell(0, 5, txt)
        self.ln(1)

    def code(self, txt):
        self.set_font("Courier", "", 8.5)
        self.set_fill_color(245, 245, 247)
        self.set_draw_color(220, 220, 225)
        x = self.get_x(); y = self.get_y()
        lines = txt.split("\n")
        h = 4.5 * len(lines) + 4
        self.rect(x, y, 190, h, style="FD")
        self.set_xy(x + 2, y + 2)
        for line in lines:
            self.cell(0, 4.5, line, ln=1)
            self.set_x(x + 2)
        self.set_xy(x, y + h + 1)

pdf = PDF()
pdf.set_auto_page_bracket = True
pdf.add_page()

# ===== INTRO =====
pdf.h2("Base Configuration")
pdf.label("Base URL", "{NEXT_PUBLIC_API_BASE_URL}  (env var)")
pdf.label("Auth", "Header: Authorization: Bearer <token>")
pdf.label("Content", "application/json")
pdf.ln(2)

# ===================================================================
# PAYMENT
# ===================================================================
pdf.h1("A. Payment / Subscription Purchase Flow")

pdf.para(
    "Alur: (1) Get plan -> (2) Get payment methods -> (3) Purchase subscription "
    "with selected method -> (4) Show payment instruction (VA / Bank Transfer / QRIS) -> "
    "(5) Poll status setiap 5 detik (max 60x / 5 menit) sampai subscription_status = active."
)

# 1
pdf.h2("1) Get Plans")
pdf.label("URL", "/api/v1/subscriptions/plans")
pdf.label("Method", "GET")
pdf.label("Body", "-")
pdf.label("Response", "")
pdf.code(
'{\n'
'  "success": true,\n'
'  "data": [\n'
'    {\n'
'      "id": "string",\n'
'      "name": "string",\n'
'      "price": 99000,\n'
'      "duration_days": 30\n'
'    }\n'
'  ]\n'
'}'
)
pdf.para("Catatan: FE mengambil plan pertama (data[0]) untuk halaman checkout.")

# 2
pdf.h2("2) Get Payment Methods")
pdf.label("URL", "/api/v1/payments/methods")
pdf.label("Method", "GET")
pdf.label("Body", "-")
pdf.label("Response", "")
pdf.code(
'{\n'
'  "success": true,\n'
'  "data": {\n'
'    "all": [\n'
'      {\n'
'        "code": "virtual_account",   // atau "bank_transfer" / "qris"\n'
'        "name": "Virtual Account",\n'
'        "description": "Bayar via VA bank",\n'
'        "estimatedTime": "Real-time",\n'
'        "category": "Virtual Account"  // "Bank Transfer" / "QRIS"\n'
'      }\n'
'    ]\n'
'  }\n'
'}'
)
pdf.para('Catatan: FE web menyembunyikan code "bank_transfer" (hanya VA & QRIS ditampilkan). '
         'Mobile bebas menampilkan sesuai kebutuhan.')

# 3
pdf.h2("3) Purchase Subscription (Create Transaction)")
pdf.label("URL", "/api/v1/payments/subscriptions/purchase")
pdf.label("Method", "POST")
pdf.label("Body", "")
pdf.code(
'{\n'
'  "plan_id": "string",\n'
'  "payment_type": "virtual_account" | "bank_transfer" | "qris",\n'
'  "va_bank": "MANDIRI" | "BCA" | "CIMB" | "DANAMON"   // wajib jika virtual_account\n'
'}'
)
pdf.label("Response", "")
pdf.code(
'{\n'
'  "success": true,\n'
'  "data": {\n'
'    "payment_type": "virtual_account" | "bank_transfer" | "qris",\n'
'    "order_id": "string",\n'
'    "subscription_id": "string",\n'
'    "invoice_id": "string",\n'
'\n'
'    // === Jika payment_type = "virtual_account" ===\n'
'    "virtual_account_no": "8808xxxxxxxx",\n'
'    "va_expiry": "2026-09-08T12:00:00Z",\n'
'    "amount": "99000",\n'
'\n'
'    // === Jika payment_type = "bank_transfer" ===\n'
'    "bank_name": "BCA",\n'
'    "bank_account_no": "1234567890",\n'
'    "bank_account_name": "PT Sublime",\n'
'    "payment_code": "123",\n'
'    "amount": "99123",\n'
'    "expired_date": "2026-09-08T12:00:00Z",\n'
'\n'
'    // === Jika payment_type = "qris" ===\n'
'    "qr_content": "00020101021226...",\n'
'    "validity_period": "2026-09-07T18:00:00Z",\n'
'    "reference_no": "string"\n'
'  }\n'
'}'
)

pdf.add_page()

# 4
pdf.h2("4) Check Payment Status (Polling)")
pdf.label("URL", "/api/v1/payments/status/{order_id}")
pdf.label("Method", "GET")
pdf.label("Body", "-")
pdf.label("Response", "")
pdf.code(
'{\n'
'  "success": true,\n'
'  "data": {\n'
'    "subscription_status": "active" | "pending" | "expired" | "cancelled"\n'
'    // field lain: invoice_status, order_id, dsb.\n'
'  }\n'
'}'
)
pdf.para("Polling: setiap 5 detik, maksimum 60x (5 menit). "
         "Stop polling jika status = active (sukses) / expired / cancelled (gagal).")

pdf.h2("VA Bank Options (hardcoded di FE)")
pdf.code(
'MANDIRI  -> Bank Mandiri\n'
'BCA      -> BCA\n'
'CIMB     -> CIMB Niaga\n'
'DANAMON  -> Bank Danamon'
)

# ===================================================================
# WITHDRAWAL
# ===================================================================
pdf.add_page()
pdf.h1("B. Affiliate Withdrawal Flow")
pdf.para(
    "Alur: (1) Get balance -> (2) Get saved banks -> (opsional) Add bank baru -> "
    "(3) Request withdrawal -> (4) Refresh balance & history. "
    "Menggunakan BATpay, transfer real-time (beberapa menit)."
)

# 1
pdf.h2("1) Get Withdrawal Balance")
pdf.label("URL", "/api/v1/affiliates/withdrawals/balance")
pdf.label("Method", "GET")
pdf.label("Body", "-")
pdf.label("Response", "")
pdf.code(
'{\n'
'  "success": true,\n'
'  "data": {\n'
'    "available_balance": 150000,   // saldo yang bisa ditarik (dipakai FE)\n'
'    "total_earnings": 500000,\n'
'    "pending_balance": 20000,\n'
'    "withdrawn": 330000\n'
'  }\n'
'}'
)
pdf.para("Catatan: mobile HARUS menampilkan available_balance (bukan total_earnings). "
         "FE web sudah dikoreksi ke available_balance.")

# 2
pdf.h2("2) Get Saved Bank Accounts")
pdf.label("URL", "/api/v1/affiliates/banks")
pdf.label("Method", "GET")
pdf.label("Body", "-")
pdf.label("Response", "")
pdf.code(
'{\n'
'  "success": true,\n'
'  "data": [\n'
'    {\n'
'      "id": "string",\n'
'      "bank_name": "BCA",\n'
'      "bank_code": "bca",\n'
'      "account_number": "1234567890",\n'
'      "account_holder_name": "John Doe"\n'
'    }\n'
'  ]\n'
'}'
)

# 3
pdf.h2("3) Get Supported Bank List (untuk form tambah rekening)")
pdf.label("URL", "/api/v1/affiliates/banks/list")
pdf.label("Method", "GET")
pdf.label("Body", "-")
pdf.label("Response", "")
pdf.code(
'{\n'
'  "success": true,\n'
'  "data": [\n'
'    { "name": "BCA",     "code": "bca" },\n'
'    { "name": "Mandiri", "code": "mandiri" },\n'
'    { "name": "BNI",     "code": "bni" },\n'
'    { "name": "BRI",     "code": "bri" }\n'
'    // ... daftar bank lain\n'
'  ]\n'
'}'
)

pdf.add_page()

# 4
pdf.h2("4) Add Bank Account")
pdf.label("URL", "/api/v1/affiliates/banks")
pdf.label("Method", "POST")
pdf.label("Body", "")
pdf.code(
'{\n'
'  "bank_name": "BCA",\n'
'  "bank_code": "bca",\n'
'  "account_number": "1234567890",\n'
'  "account_holder_name": "John Doe"\n'
'}'
)
pdf.label("Response", "")
pdf.code(
'{\n'
'  "success": true,\n'
'  "data": { "id": "string", ...fields di atas }\n'
'}'
)
pdf.para("Catatan penting: field harus persis bank_name, bank_code, account_number, "
         "account_holder_name. FE web sempat salah field (account_name / account_holder), "
         "sekarang sudah diperbaiki.")

# 5
pdf.h2("5) Delete Bank Account")
pdf.label("URL", "/api/v1/affiliates/banks/{id}")
pdf.label("Method", "DELETE")
pdf.label("Body", "-")
pdf.label("Response", "{ \"success\": true }")

# 6
pdf.h2("6) Request Withdrawal")
pdf.label("URL", "/api/v1/affiliates/withdrawals")
pdf.label("Method", "POST")
pdf.label("Body", "")
pdf.code(
'{\n'
'  "amount": 50000,             // integer Rupiah, min 10000\n'
'  "bank_account_id": "string"  // id dari saved bank\n'
'}'
)
pdf.label("Response", "")
pdf.code(
'{\n'
'  "success": true,\n'
'  "data": {\n'
'    "id": "string",\n'
'    "amount": 50000,\n'
'    "status": "pending" | "processing" | "success" | "failed",\n'
'    "bank_account_id": "string",\n'
'    "created_at": "ISO datetime"\n'
'  }\n'
'}'
)
pdf.para("Validasi FE: amount >= 10.000 dan amount <= available_balance.")

# 7
pdf.h2("7) Get Withdrawal History")
pdf.label("URL", "/api/v1/affiliates/withdrawals")
pdf.label("Method", "GET")
pdf.label("Params", "opsional (page, limit, status, dsb)")
pdf.label("Response", "")
pdf.code(
'{\n'
'  "success": true,\n'
'  "data": [\n'
'    {\n'
'      "id": "string",\n'
'      "amount": 50000,\n'
'      "status": "success",\n'
'      "bank_name": "BCA",\n'
'      "account_number": "1234567890",\n'
'      "created_at": "ISO datetime",\n'
'      "processed_at": "ISO datetime"\n'
'    }\n'
'  ]\n'
'}'
)

# ===================================================================
# SUMMARY
# ===================================================================
pdf.add_page()
pdf.h1("C. Endpoint Cheat Sheet")

rows = [
    ("Payment",     "GET",    "/api/v1/subscriptions/plans"),
    ("Payment",     "GET",    "/api/v1/payments/methods"),
    ("Payment",     "POST",   "/api/v1/payments/subscriptions/purchase"),
    ("Payment",     "GET",    "/api/v1/payments/status/{order_id}"),
    ("Withdrawal",  "GET",    "/api/v1/affiliates/withdrawals/balance"),
    ("Withdrawal",  "GET",    "/api/v1/affiliates/banks"),
    ("Withdrawal",  "GET",    "/api/v1/affiliates/banks/list"),
    ("Withdrawal",  "POST",   "/api/v1/affiliates/banks"),
    ("Withdrawal",  "DELETE", "/api/v1/affiliates/banks/{id}"),
    ("Withdrawal",  "POST",   "/api/v1/affiliates/withdrawals"),
    ("Withdrawal",  "GET",    "/api/v1/affiliates/withdrawals"),
]

pdf.set_font("Helvetica", "B", 9)
pdf.set_fill_color(230, 240, 242)
pdf.cell(30, 7, "Module", border=1, fill=True)
pdf.cell(22, 7, "Method", border=1, fill=True)
pdf.cell(138, 7, "URL", border=1, fill=True, ln=1)

pdf.set_font("Courier", "", 8.5)
for module, method, url in rows:
    pdf.cell(30, 6, module, border=1)
    pdf.cell(22, 6, method, border=1)
    pdf.cell(138, 6, " " + url, border=1, ln=1)

pdf.ln(6)
pdf.set_font("Helvetica", "I", 8)
pdf.set_text_color(120, 120, 120)
pdf.multi_cell(0, 4.5,
    "Dokumen di-generate dari source code sublime-fe/sublime-landing. "
    "Field response 'data' yang tidak dipakai FE tidak tercantum, silakan verifikasi "
    "kelengkapannya via Swagger/Postman backend jika perlu.")

out = r"C:\Users\LENOVO LOQ\Projects\sublime-fe\sublime-landing\sublime-api-integration.pdf"
pdf.output(out)
print("OK:", out)
