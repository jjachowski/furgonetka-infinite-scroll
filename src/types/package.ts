export type Package = {
  id: number;
  service: string;
  datetime_send: string;
  sender: {
    name: string;
    surname: string;
  };
  receiver: {
    name: string;
    surname: string;
  };
  parcels: {
    package_no: string;
    weight: number;
    width: number;
    height: number;
    depth: number;
  };
};
