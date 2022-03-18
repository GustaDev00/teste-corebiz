import ModalCep from "./components/cep";
import { CepProvider } from './context/useModalStatus'

const Cep = () => {
  return (
    <CepProvider>
      <ModalCep />
    </CepProvider>
  )
}
export default Cep
