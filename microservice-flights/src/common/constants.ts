export enum RabbitMQ{
    FlightQueue = 'flight',
}

export enum FlightMSG{
    CREATE = 'CREATE_FLIGHT',
    FIND_ALL= 'FIND_FLIGHTS',
    FIND_ONE = 'FIND_FLIGHT',
    UPDATE = 'UPDATE_FLIGHT',
    DELETE = 'DELETE_FLIGHT',
    ADD_PASSENGER = 'ADD_PASSENGER',
   
}