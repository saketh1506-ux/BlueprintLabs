import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting BlueprintLabs Database Seed...');

  // 1. Create Demo User
  const passwordHash = await bcrypt.hash('DemoPass@123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'saketh@example.com' },
    update: {},
    create: {
      email: 'saketh@example.com',
      name: 'Saketh',
      passwordHash,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
  });
  console.log(`✅ Demo user established: ${user.name} (${user.email})`);

  // 2. Create Collaborator Users
  const ananya = await prisma.user.upsert({
    where: { email: 'ananya@example.com' },
    update: {},
    create: {
      email: 'ananya@example.com',
      name: 'Ananya',
      passwordHash,
    },
  });

  const rahul = await prisma.user.upsert({
    where: { email: 'rahul@example.com' },
    update: {},
    create: {
      email: 'rahul@example.com',
      name: 'Rahul',
      passwordHash,
    },
  });

  // 3. Create Demo Projects matching Wireframe Screen 03 (Dashboard)
  const dreamHome = await prisma.project.upsert({
    where: { joinCode: 'NP-7X3KB' },
    update: {},
    create: {
      title: 'Dream Home',
      creationMethod: 'VOICE',
      ownerId: user.id,
      joinCode: 'NP-7X3KB',
      isPublic: false,
      members: {
        create: [
          { userId: ananya.id, role: 'EDITOR' },
          { userId: rahul.id, role: 'VIEWER' },
        ],
      },
      floorPlan: {
        create: {
          version: 1,
          data: {
            unit: 'feet',
            summary: {
              bedrooms: 2,
              bathrooms: 1,
              totalAreaSqFt: 850,
            },
            rooms: [
              { id: 'r1', name: 'Living Room', type: 'LIVING', x: 200, y: 150, width: 320, height: 240, wallThickness: 8 },
              { id: 'r2', name: 'Bedroom 1', type: 'BEDROOM', x: 200, y: 390, width: 240, height: 220, wallThickness: 8 },
              { id: 'r3', name: 'Bedroom 2', type: 'BEDROOM', x: 520, y: 150, width: 240, height: 220, wallThickness: 8 },
              { id: 'r4', name: 'Kitchen', type: 'KITCHEN', x: 200, y: 50, width: 200, height: 160, wallThickness: 8 },
              { id: 'r5', name: 'Bathroom', type: 'BATHROOM', x: 440, y: 390, width: 160, height: 100, wallThickness: 8 },
              { id: 'r6', name: 'Balcony', type: 'BALCONY', x: 520, y: 50, width: 200, height: 80, wallThickness: 8 },
            ],
            furniture: [
              { id: 'f1', name: 'Sofa', type: 'SOFA', roomId: 'r1', x: 240, y: 220, width: 140, height: 60, rotation: 0 },
              { id: 'f2', name: 'Bed 1', type: 'BED', roomId: 'r2', x: 230, y: 430, width: 120, height: 140, rotation: 0 },
            ],
          },
        },
      },
      activities: {
        create: {
          userId: ananya.id,
          action: 'edited the kitchen in Dream Home',
        },
      },
    },
  });

  console.log(`✅ Project '${dreamHome.title}' seeded with joinCode: ${dreamHome.joinCode}`);
  console.log('🎉 Seeding successfully completed.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
