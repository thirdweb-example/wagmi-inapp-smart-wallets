import { useAccount, useConnect, useDisconnect, useSendTransaction } from "wagmi";
import { chain } from "./wagmi.js";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { sendTransaction, isPending, isSuccess, isError, error: sendTxError, data: sendTxData } = useSendTransaction();
  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => {
              if (connector.type === "in-app") {
                connect({
                  connector,
                  chainId: chain.id,
                  strategy: "google",
                });
              } else {
                connect({ connector, chainId: chain.id });
              }
            }}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      {account && (
        <div>
          <h2>Transact</h2>
          <button onClick={() => sendTransaction({ to: account.address, value: 0n })} type="button">
            Send Tx
          </button>
          <div>{isPending ? "Sending..." : ""}</div>
          <div>{isSuccess ? `Success: ${sendTxData}` : isError ? sendTxError?.message : ""}</div>
        </div>
      )}
    </>
  );
}

export default App;
