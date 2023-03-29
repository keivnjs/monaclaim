import Image from "next/image"
import { ButtonHTMLAttributes } from "react"
import { classNames } from "shared/utils/classNames"
import { Spinner } from "../Spinners"

type Props = {
  loading?: boolean
  loadingText?: string
  variant?: "primary" | "secondary"
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<Props> = (props) => {
  const {
    children,
    className,
    onClick,
    loading,
    loadingText,
    variant,
    ...rest
  } = props

  return (
    <button
      className={classNames(
        className,
        "group relative bottom-0 min-w-24 h-14 cursor-pointer",
        "hover:brightness-105 active:brightness-95 hover:-translate-y-px",
        "disabled:grayscale disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100 disabled:opacity-70"
      )}
      onClick={onClick}
      {...rest}
    >
      <div className={classNames(
        (variant === "primary" || !variant) && "text-red-900",
        variant === "secondary" && "text-indigo-900",
        "absolute inset-0 flex items-center justify-center z-10"
      )}>
        {loading ?
          <>
            <Spinner className="w-5 h-5 mr-2" />
            <span>{loadingText}</span>
          </>
          : children
        }
      </div>

      <div className="relative w-full h-full">
        {!variant && <Image src="/assets/button-primary.png" layout="fill" />}
        {variant && <Image src={`/assets/button-${variant}.png`} layout="fill" />}
      </div>
    </button>
  )
}

export default Button
