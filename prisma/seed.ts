import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

import {
  invoices,
  customers,
  revenue,
  users,
} from "../app/lib/placeholder-data"

const prisma = new PrismaClient()
async function main() {
  for (var user of users) {
    user.password = await bcrypt.hash(user.password, 10)
  }
  const result = await prisma.user.createMany({
    data: users,
    skipDuplicates: true, // Optional: skips creating records with duplicate unique keys
  })
  console.log(`Created ${result.count} users`)

  const r2 = await prisma.customer.createMany({
    data: customers,
    skipDuplicates: true, // Optional: skips creating records with duplicate unique keys
  })
  console.log(`Created ${r2.count} customers`)

  const r3 = await prisma.invoice.createMany({
    data: invoices,
    skipDuplicates: true, // Optional: skips creating records with duplicate unique keys
  })
  console.log(`Created ${r3.count} invoices`)

  const r4 = await prisma.revenue.createMany({
    data: revenue,
    skipDuplicates: true, // Optional: skips creating records with duplicate unique keys
  })
  console.log(`Created ${r4.count} revenue`)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
