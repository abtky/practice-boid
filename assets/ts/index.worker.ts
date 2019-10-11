import SteeredVehicle from './SteeredVehicle';
import WorkerController, { SimpleVehicleList } from '~/assets/ts/WorkerController';

addEventListener('message', e => {
    // `data` にはメインから渡された `100` が入ってくる。
    const { data } = e;
    const receivedList: SimpleVehicleList = JSON.parse(data);
    const vehicles: SteeredVehicle[] = WorkerController.generateFromSimpleList(receivedList);
    vehicles.forEach(vehicle => {
        vehicle.flock(vehicles);
        vehicle.update();
    });
    const postList: SimpleVehicleList = WorkerController.simplify(vehicles);
    postMessage(JSON.stringify(postList));
});