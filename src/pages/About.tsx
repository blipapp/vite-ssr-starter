
// import { Button } from "@chakra-ui/react";
const Button = (props: any) => <button {...props} />

const cache = new Map();

const readData = (key: string) => {
  if (!cache.has(key)) {
    throw new Promise<void>((resolve) => {
      setTimeout(() => {
        cache.set(key, "foo");
        resolve();
      }, 1000);
    });
  }
  return cache.get(key);
};

export default function About({ cacheKey }: any) {
  const data = readData(cacheKey);
  return (
    <div>
      about {data} <Button>Hi!</Button>
    </div>
  );
}
