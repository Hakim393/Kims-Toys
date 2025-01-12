import nodemailer from "nodemailer";
import { db } from "@/configs/db.js";
import {
  usersTable,
  cartTable,
  productsTable,
  transactionsTable,
} from "@/configs/schema.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { orderId, amount, email, fullName, transactionDetails } = req.body;

    if (!orderId || !amount || !email || !fullName || !transactionDetails) {
      return res.status(400).json({
        success: false,
        message: "Data yang dikirim tidak lengkap.",
      });
    }

    try {
      // Ambil data pengguna dari tabel users
      const user = await db
        .select()
        .from(usersTable)
        .where(usersTable.email.equals(email))
        .single();

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Pengguna tidak ditemukan.",
        });
      }
      console.log(user);

      // Ambil data produk dari keranjang
      const cartItems = await db
        .select({
          productId: cartTable.productId,
          quantity: cartTable.quantity,
          title: productsTable.title,
          price: productsTable.price,
        })
        .from(cartTable)
        .innerJoin(productsTable, productsTable.id.equals(cartTable.productId))
        .where(cartTable.email.equals(email));

      // Simpan data transaksi ke tabel transactions
      await db.insert(transactionsTable).values({
        userId: user.id,
        orderId,
        amount,
      });

      // Format daftar produk untuk invoice
      const productListHTML = cartItems
        .map(
          (item) =>
            `<tr>
              <td>${item.title}</td>
              <td>${item.quantity}</td>
              <td>Rp ${item.price.toLocaleString("id-ID")}</td>
              <td>Rp ${(item.price * item.quantity).toLocaleString(
                "id-ID"
              )}</td>
            </tr>`
        )
        .join("");

      // Template email (Invoice)
      const invoiceHTML = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h1 style="text-align: center; color: #4CAF50;">Invoice Pembayaran</h1>
          <p>Halo ${fullName},</p>
          <p>Terima kasih telah berbelanja di toko kami. Berikut adalah detail transaksi Anda:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
              <tr style="background: #f4f4f4;">
                <th style="padding: 8px; border: 1px solid #ddd;">Produk</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Jumlah</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Harga Satuan</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${productListHTML}
            </tbody>
            <tfoot>
              <tr style="font-weight: bold;">
                <td colspan="3" style="padding: 8px; border: 1px solid #ddd;">Total</td>
                <td style="padding: 8px; border: 1px solid #ddd;">Rp ${amount.toLocaleString(
                  "id-ID"
                )}</td>
              </tr>
            </tfoot>
          </table>
          <p><strong>ID Pesanan:</strong> ${orderId}</p>
          <p><strong>Nama Pembayar:</strong> ${
            transactionDetails.payer.name.given_name
          }</p>
          <p><strong>Email Pembayar:</strong> ${
            transactionDetails.payer.email_address
          }</p>
          <p><strong>Tanggal Transaksi:</strong> ${new Date().toLocaleString(
            "id-ID"
          )}</p>
          <p>Salam hangat,<br />Tim Toko</p>
        </div>
      `;

      // Konfigurasi Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "fikhihakim45@gmail.com",
          pass: "1Nform4tik4393",
        },
      });

      const mailOptions = {
        from: "fikhihakim45@gmail.com",
        to: email,
        subject: "Invoice Pembayaran Anda",
        html: invoiceHTML,
      };

      // Kirim email
      await transporter.sendMail(mailOptions);

      // Respons sukses
      res.status(200).json({
        success: true,
        message: "Transaksi berhasil disimpan dan email invoice telah dikirim.",
      });
    } catch (error) {
      console.error("Error saat memproses transaksi:", error);
      res.status(500).json({
        success: false,
        message:
          "Terjadi kesalahan saat menyimpan transaksi atau mengirim email.",
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Metode HTTP tidak diizinkan.",
    });
  }
}
