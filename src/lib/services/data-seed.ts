import "dotenv/config";
import { prismaClient } from "./prisma-client";
import { EVENTOS } from "../data/eventos";
import { exit } from "process";

function seed() {
  EVENTOS.map(async (e) => {
    try {
      await prismaClient.evento.create({
        data: {
          titulo: e.titulo,
          descripcion: e.descripcion,
          fecha: e.fecha,
          lugar: e.lugar,
          categoria: e.categoria,
        },
      });
    } catch (error) {
      console.error(error);
      await prismaClient.$disconnect();
      exit(1);
    } finally {
      await prismaClient.$disconnect();
    }
  });
}
seed();
