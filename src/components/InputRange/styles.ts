import styled from "styled-components"

type StyledInputRangeProps = {
  percentage: number
}

export const StyledInputRange = styled.input.attrs({ type: "range" }) <StyledInputRangeProps>`
  -webkit-appearance: none;
  width: 100%;
  outline: none !important;
  appearance: none;
  background: none;
  border: none;
  border-radius: 4px;

  cursor: pointer;

  &::-moz-focus-outer {
    border: 0;
  }

  &:hover {
    outline: none;

    &::-webkit-slider-thumb {
      margin-top: -4px;

      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;

      height: 18px;
      width: 18px;
    }

    &::-moz-range-thumb {
      height: 18px;
      width: 18px;

      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    }
  }

  &.no-progress::-webkit-slider-thumb {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  &.no-progress::-moz-range-thumb {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  /* Chrome */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    /* margin-top: -5px; */
    height: 10px;
    width: 10px;
    /* border-radius: 50%; */
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    background: green;
    cursor: pointer;
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    border: none;
    border-radius: 4px;
    max-height: 10px;
    background: #333;
    background: ${({ percentage }) =>
    percentage < 50
      ? `
      linear-gradient(to left, #333 calc(100% - ${percentage}%), green ${percentage}%);
    `
      : `
      linear-gradient(to right, green ${percentage}%, #333 calc(100% - ${percentage}%));
    `};
  }

  /* Moz */
  &::-moz-range-track {
    box-sizing: border-box;
    background: #333;
    border: none;
    border-radius: 4px;
    min-height: 10px;
  }

  &::-moz-range-progress {
    background: green;
    min-height: 10px;
    border-radius: 4px;
  }

  &::-moz-range-thumb {
    box-sizing: border-box;
    border: none;
    width: 10px;
    height: 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background: green;
    cursor: pointer;
  }

  /* IE*/
  &::-ms-track {
    box-sizing: border-box;
    background: #333;
    border: none;
    border-radius: 4px;
    min-height: 10px;
  }

  &::-ms-fill-lower {
    background: green;
    min-height: 10px;
    border-radius: 4px;
  }
  
  &::-ms-thumb {
    margin-top: 0;
    box-sizing: border-box;
    border: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: green;
    cursor: pointer;
  }

  &::-ms-tooltip {
    display: none;
  }

  &:disabled {
    cursor: not-allowed;

    /* Chrome */
    &::-webkit-slider-thumb {
      cursor: not-allowed;
    }

    /* Moz */
    &::-moz-range-thumb {
      cursor: not-allowed;
    }

    /* IE */
    &::-ms-thumb {
      cursor: not-allowed;
    }
  }
`;
