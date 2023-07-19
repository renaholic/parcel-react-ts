import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// https://docs.pmnd.rs/zustand/guides/updating-state
interface BearState {
  bears: number;
  increase: (by: number) => void;
  decrease: (by: number) => void;
  reset: () => void;
}

const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
        decrease: (by) =>
          set((state) => ({ bears: Math.max(state.bears - by, 0) })),
        reset: () =>
          set(() => ({
            bears: 0,
          })),
      }),
      {
        name: 'bear-storage',
      },
    ),
  ),
);

const Header = () => (
  <nav className="container-fluid">
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
);

export function App() {
  const { bears, increase, decrease, reset } = useBearStore();

  return (
    <>
      <Header />
      <main className="container">
        <details>
          <summary role="button" className="secondary">
            Zustand Playground
          </summary>
          <p>you have {bears} bears</p>
          <div className="grid">
            <button onClick={() => increase(1)}>make bear</button>
            <button onClick={() => decrease(1)}>kill bear</button>
            <button onClick={() => reset()} className="secondary">
              Reset
            </button>
          </div>
        </details>
      </main>
    </>
  );
}
