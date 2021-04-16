export default function getFormInputValues(form: HTMLFormElement): Record<string, string> {
  const formData: Record<string, string> = {};
  const formInputs = form.getElementsByTagName('input');

  for (let inputIndex = 0; inputIndex < formInputs.length; inputIndex++) {
    const input = formInputs[inputIndex];
    const inputName = input.getAttribute('name');

    if (inputName !== null) {
      formData[inputName] = input.value;
    }
  }

  return formData;
}
