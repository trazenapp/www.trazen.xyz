
import { useDisconnect } from "wagmi";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/src/redux/store";
import {
  clearError,
  setLoading,
  updateFormData,
  createWallet,
  resetForm,
} from "@/src/redux/slices/createWallet";
import { toast } from "react-toastify";

export const ConnectWallet = () => {
  const { disconnect } = useDisconnect();
  const dispatch = useAppDispatch();

  // Track last sent: address + chain.name
  const lastSent = useRef<{ address?: string; chainName?: string }>({});

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain && !chain.unsupported;

        // Call API when address or chain.name changes
        useEffect(() => {
          if (!connected) {
            lastSent.current = {}; // Reset on disconnect
            return;
          }

          const current = {
            address: account.address,
            chainName: chain.name,
          };

          console.log(account.address, chain.name);

          // Only send if address OR chain name changed
          if (
            current.address !== lastSent.current.address ||
            current.chainName !== lastSent.current.chainName
          ) {
            lastSent.current = current;

            // Dispatch createWallet action
            const submitWalletDetails = async () => {
              dispatch(clearError());
              try {
                dispatch(setLoading(true));

                dispatch(
                  updateFormData({
                    network: chain.name!,
                    address: account.address!,
                  })
                );
                console.log(account.address, chain.name);
                await dispatch(
                  createWallet({
                    network: chain.name!,
                    address: account.address!,
                  })
                ).unwrap();

                toast(<div>Wallet created successfully</div>, {
                  theme: "dark",
                  type: "success",
                });

                dispatch(setLoading(false));
                dispatch(resetForm());
              } catch (error: any) {
                if (error != "Wallet already exists") {
                  toast(<div>{error}</div>, {
                    theme: "dark",
                    type: "error",
                  });
                }
                dispatch(setLoading(false));
              }
            };

            submitWalletDetails();
          }
        }, [connected, account?.address, chain?.name]);

        // Render: Connect or Disconnect button
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="w-full border rounded-[14px] border-[#303030] "
          >
            {connected ? (
              <button
                onClick={() => disconnect()}
                type="button"
                className="cursor-pointer w-full py-3.5"
              >
                Disconnect Wallet
              </button>
            ) : (
              <button
                onClick={openConnectModal}
                type="button"
                className="cursor-pointer  w-full py-3.5"
              >
                Connect Wallet
              </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
