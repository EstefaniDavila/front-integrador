import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateProductModal = ({ onCreate }) => {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    id: "",
    desc: "",
    stock: "",
    loc: "",
    type: "repuesto",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.id || !form.desc) return;

    const newProduct = {
      ...form,
      stock: Number(form.stock),
      status:
        form.stock == 0 ? "AGOT" :
        form.stock < 10 ? "Bajo" : "OK",
    };

    onCreate(newProduct);
    setOpen(false);

    // reset
    setForm({
      id: "",
      desc: "",
      stock: "",
      loc: "",
      type: "repuesto",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Botón que abre el modal */}
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm">
          NUEVO PRODUCTO
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Producto</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">

          {/* Código */}
          <div className="grid gap-2">
            <Label>Código</Label>
            <Input name="id" value={form.id} onChange={handleChange} />
          </div>

          {/* Descripción */}
          <div className="grid gap-2">
            <Label>Descripción</Label>
            <Input name="desc" value={form.desc} onChange={handleChange} />
          </div>

          {/* Stock */}
          <div className="grid gap-2">
            <Label>Stock</Label>
            <Input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          {/* Ubicación */}
          <div className="grid gap-2">
            <Label>Ubicación</Label>
            <Input name="loc" value={form.loc} onChange={handleChange} />
          </div>

          {/* Tipo */}
          <div className="grid gap-2">
            <Label>Tipo</Label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="h-10 rounded-md border px-3"
            >
              <option value="repuesto">Repuesto</option>
              <option value="maquinaria">Maquinaria</option>
            </select>
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;