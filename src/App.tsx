import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface BearState {
  bears: number;
  increase: (by: number) => void;
  decrease: (by: number) => void;
}

const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
        decrease: (by) => set((state) => ({ bears: state.bears - by })),
      }),
      {
        name: 'bear-storage',
      },
    ),
  ),
);

export function App() {
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);
  const decrease = useBearStore((state) => state.decrease);

  return (
    <>
      <header className="container-fluid">
        <nav>
          <ul>
            <li>
              <strong>Brand</strong>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#">Link</a>
            </li>
            <li>
              <a href="#">Link</a>
            </li>
            <li>
              <a href="#" role="button">
                Button
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <div className="grid">
          <div>
            <button onClick={() => increase(1)}>make bear</button>
          </div>
          <button onClick={() => decrease(1)}>kill bear</button>
          <p>you have {bears} bears</p>
        </div>
      </main>
      <footer className="container-fluid"></footer>
    </>
  );
}
