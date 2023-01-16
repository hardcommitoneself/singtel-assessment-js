import { forwardRef, useRef, useEffect } from "react"

const Radio = forwardRef(
    ({ indeterminate, id, ...rest }, ref) => {
      const defaultRef = useRef()
      const resolvedRef = ref || defaultRef
  
      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])

      return (
        <input className="relative w-6 h-6 md:w-8 md:h-8" type="radio" ref={resolvedRef} {...rest} />
      )
    }
)

export default Radio