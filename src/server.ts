import Fastify from 'fastify';

const server = Fastify({
    logger: true,

});

const portServer = process.env.PORT;

interface DriverParams {
    id: string
}

interface TeamParams {
    id: string
}

const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 4, name: "Ferrari", base: "Maranello, Italy" },
  { id: 5, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 7, name: "Alfa Romeo Racing", base: "Hinwil, Switzerland" },
  { id: 8, name: "AlphaTauri", base: "Faenza, Italy" },
  { id: 9, name: "Williams", base: "Grove, United Kingdom" },
  { id: 10, name: "Haas", base: "Kannapolis, United States" },
  { id: 11, name: "Uralkali Haas F1 Team", base: "Banbury, United Kingdom" },
  { id: 12, name: "Scuderia Toro Rosso", base: "Faenza, Italy" },
];

const drivers = [
  { id: 1, name: "Max Verstappen", teamId: 3 },
  { id: 2, name: "Lewis Hamilton", teamId: 4 },
  { id: 3, name: "Lando Norris", teamId: 1 },
];

server.get('/teams', async(request, response) => {
    response.type('application/json').code(200);
    
    return { teams };
});

server.get<{ Params: TeamParams }>('/teams/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const team = teams.find(t => t.id === id);

    if (!team) {
        response.type('application/json').code(404);
        return { message: "Team Not Found" };
    }

    response.type('application/json').code(200);
    return { team };
});

server.get<{ Params: TeamParams }>('/teams/:id/drivers', async (request, response) => {
    const teamId = parseInt(request.params.id);
    const teamDrivers = drivers.filter(driver => driver.teamId === teamId);
    

    if (teamDrivers.length === 0) {
        response.type('application/json').code(404);
        return { message: "No Drivers Found for this Team" };
    }
    response.type('application/json').code(200);
    return { team: teams.find(team => team.id === teamId), drivers: teamDrivers };
});

server.get('/drivers', async(request, response) => {
    response.type('application/json').code(200);

    return { drivers };
});

server.get<{ Params: DriverParams }>('/drivers/:id', async(request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(d => d.id === id);

    if(!driver){
        response.type('application/json').code(404);
        return { message : "Driver Not Found"}
    } else {
        response.type('application/json').code(404);
        return { driver }
    }
});

server.listen({port: Number(portServer)}, () => {
    console.log("Server init"); 
});