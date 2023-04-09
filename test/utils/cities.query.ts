import { PrismaService } from "src/prisma/prisma.service";
const data : object = require("./countries.min.json")

export async function GenerateCities(prisma: PrismaService) {
    for (const country in data) {
        const cntry = await prisma.country.create({
            data: {
                name: country,
            },
        })
        for (const cityn in data[country]) {
            await prisma.city.create({
                data: {
                    name: data[country][cityn],
                    countryId: cntry.id
                }
            })
        }
    }
}
