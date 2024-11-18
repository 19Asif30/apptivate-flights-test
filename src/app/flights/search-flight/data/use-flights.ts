import { atom, useAtom } from "jotai";

const configAtom = atom({
  destinations: [],
  active_airports: []
});

export function useFlights() {
  return useAtom(configAtom);
}
