import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { PrismaUserMapper } from "src/infra/database/prisma/mappers/PrismaUserMapper";
import { makeUser } from "src/modules/user/factories/userFactory";
import { PrismaOrganizationMapper } from "src/infra/database/prisma/mappers/PrismaOrganizationMapper";
import { makeOrganization } from "src/modules/organization/factories/organizationFactory";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    const defaultOrganization = makeOrganization({name: 'Anjotech'})

    const organization = await prisma.organization.create({data: PrismaOrganizationMapper.toPrisma(defaultOrganization)});

    console.log(`${organization.nome} organization seeded`);

    const defaultPassword = await hash(process.env.LUNA_PASSWORD || 'luna1234', 10);

    const LunaUser = makeUser({name: 'Luna', email: 'luna@anjotech.com', password: defaultPassword, organizationId: organization.id});

    const user = await prisma.user.create({data: PrismaUserMapper.toPrisma(LunaUser)});

    console.log(`${user.nome} user seeded`);
}

main()
.catch(e => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});