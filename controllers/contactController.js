const Contact = require('../models/Contact');

// Obtener todos los contactos
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    // Transformar cada contacto para usar `id` en lugar de `_id`
    const formatted = contacts.map(c => ({
      id: c._id.toString(),
      name: c.name,
      email: c.email,
      phone: c.phone
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Crear un nuevo contacto
exports.createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    if (await Contact.findOne({ email })) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const contact = await new Contact({ name, email, phone }).save();

    // Devolver el nuevo contacto con `id` en lugar de `_id`
    res.status(201).json({
      id: contact._id.toString(),
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Eliminar contacto
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    await contact.deleteOne();              // ← replace remove() with deleteOne()
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    console.error('Error deleting contact:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


