components=(
  alert alert-dialog aspect-ratio avatar badge button calendar card carousel
  checkbox collapsible combobox command context-menu dialog dropdown-menu
  form hover-card input label menubar navigation-menu pagination popover
  progress radio-group scroll-area select separator sheet skeleton slider
  sonner switch table tabs textarea toast toggle toggle-group tooltip
)

for comp in "${components[@]}"; do
  npx shadcn-ui@latest add "$comp"
done
