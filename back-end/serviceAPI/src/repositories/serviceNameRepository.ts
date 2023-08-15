import { ServiceName } from "@prisma/client";
import { prisma } from "../database.js";

export interface ServiceNameData extends ServiceName {
    services: {
        id: string;
        price: number;
        professional: {
            name: string;
        };
    }[];
};

async function getAll() {
    const servicesNames: ServiceNameData[] = await prisma.serviceName.findMany({
        include: {
            services: {
                select: {
                    id: true,
                    price: true,
                    professional: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
    return servicesNames;
}

export default {
    getAll
}