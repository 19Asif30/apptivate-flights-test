import { atom, useAtom } from "jotai";

const configAtom = atom({
  destinations: null,
  active_airports: null
});

export function useFlights() {
  return useAtom(configAtom);
}
