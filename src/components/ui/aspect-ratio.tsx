"use client";

<<<<<<< HEAD
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
=======
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio@1.1.2";
>>>>>>> d9b527f86ba300856ccd1707768378e9ae6caf89

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
