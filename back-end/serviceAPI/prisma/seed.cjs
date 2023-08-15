const { PrismaClient } = require("@prisma/client");
const fs = require('fs');
const path = require('path');

import {parseAvailability, parseDuration, parsePrice} from "../src/utils";

const prisma = new PrismaClient();

async function main() {
    const filePath = path.join(__dirname, 'services.json');
    const jsonData = await fs.promises.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(jsonData);

    if (parsedData.services && Array.isArray(parsedData.services)) {
        const servicesData = parsedData.services;
        let services = [];
        let servicesNames = [];
        let servicesDescriptions = [];
        let professionals = [];
        let availabilities = [];

        servicesData.forEach((serviceData) => {
            const { id, name, professional, duration, price, availability, description } = serviceData;
            services.push({ id, name, description, duration: parseDuration(duration), price: parsePrice(price), professional, availability });
            professionals.push(professional);
            servicesNames.push(name);
            servicesDescriptions.push(description);

            availability.forEach((element) => {
                const availabilityData = parseAvailability(element);
                if(!availabilities.some((availability) =>  availability.str === element))
                    availabilities.push({...availabilityData, str: element});
            });
        });
        servicesNames = Array.from(new Set(servicesNames));
        servicesDescriptions = Array.from(new Set(servicesDescriptions));

        let newServicesNamesHash = {};
        for(let i=0; i<servicesNames.length; i++) {
            const newServiceName = await prisma.serviceName.create({
                data: { name: servicesNames[i] }
            });
            newServicesNamesHash[servicesNames[i]] = newServiceName.id;
        }
        
        let newServicesDescriptionsHash = {};
        for(let i=0; i<servicesDescriptions.length; i++) {
            const newServiceDescription = await prisma.serviceDescription.create({
                data: { description: servicesDescriptions[i] }
            });
            newServicesDescriptionsHash[servicesDescriptions[i]] = newServiceDescription.id;
        }

        let newProfessionalsHash = {};
        for(let i=0; i<professionals.length; i++) {
            const newProfessional = await prisma.professional.create({
                data: { name: professionals[i] }
            });
            newProfessionalsHash[professionals[i]] = newProfessional.id;
        }

        let newAvailabilitiesHash = {};
        for(let i=0; i<availabilities.length; i++) {
            const newAvailability = await prisma.availability.create({
                data: {
                    dayOfTheWeek: availabilities[i].dayOfTheWeek,
                    startHour: availabilities[i].startHour,
                    startMinute: 0,
                    duration: availabilities[i].duration,
                }
            });
            newAvailabilitiesHash[availabilities[i].str] = newAvailability.id;
        }

        for(let i=0; i<services.length; i++) {
            const newService = await prisma.service.create({
                data: { 
                    id: services[i].id,
                    duration: services[i].duration,
                    price: services[i].price,
                    nameId: newServicesNamesHash[services[i].name],
                    descriptionId: newServicesDescriptionsHash[services[i].description],
                    professionalId: newProfessionalsHash[services[i].professional]
                }
            });
            
            for(let j=0; j<services[i].availability.length; j++) {
                await prisma.serviceAvailability.create({
                    data: {
                        serviceId: newService.id,
                        availabilityId: newAvailabilitiesHash[services[i].availability[j]]
                    }
                });
            }
        }
    }
    else throw { type: "unprocessable_entity", message: "Invalid json data." };
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })