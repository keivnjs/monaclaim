import Image from "next/image"
import { ButtonHTMLAttributes } from "react"
import { classNames } from "shared/utils/classNames"

type Props = {
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Decrement: React.FC<Props> = (props) => {
  const { className, onClick, loading } = props
  return (
    <button
      className={classNames(
        "group relative bottom-0 w-full hover:brightness-105 active:brightness-95 hover:-translate-y-px cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="relative w-full h-14">
        <Image src="/assets/button-min.png" layout="fill" objectFit="contain" />
      </div>
    </button>
  )
}

export default Decrement
