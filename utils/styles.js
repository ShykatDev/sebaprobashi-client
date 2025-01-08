const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.5)", // Similar to TextInput
      border: state.isFocused ? "2px solid #4A90E2" : "2px solid #B0BEC5", // Focus and normal states
      borderRadius: "0.375rem", // Rounded border to match TextInput
      boxShadow: state.isFocused ? "0 0 4px rgba(74, 144, 226, 0.5)" : "none", // Subtle shadow on focus
      padding: "4px",
    }),
    input: (provided) => ({
      ...provided,
      color: "#374151", // Neutral dark color for text
      padding: "1px", // Inner padding
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF", // Neutral placeholder color
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#111827", // Primary dark color for selected value
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#FFFFFF", // White menu background
      border: "1px solid #D1D5DB", // Border around menu
      borderRadius: "0.375rem", // Rounded corners for the dropdown
      zIndex: 20,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgba(74, 144, 226, 0.1)" : "transparent", // Highlight on hover
      color: state.isSelected ? "#4A90E2" : "#111827", // Selected vs unselected colors
      padding: "8px 12px",
      cursor: "pointer",
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "#9CA3AF", // Muted color for "no options"
      padding: "8px",
      fontStyle: "italic",
    }),
  };
  
  export default customStyles;
  