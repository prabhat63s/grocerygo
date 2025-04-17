import Tax from '../models/taxModel.js';

// create
export const createTax = async (req, res) => {
  try {
    const { name, taxType, tax } = req.body;

    if (!name || !taxType || tax === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, taxType, tax',
      });
    }

    const newTax = await Tax.create({ name, taxType, tax });

    res.status(201).json({
      success: true,
      message: 'Tax created successfully',
      data: newTax,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all
export const getAllTaxes = async (req, res) => {
  try {
    const taxes = await Tax.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: taxes.length,
      data: taxes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get single
export const getTaxById = async (req, res) => {
  try {
    const tax = await Tax.findById(req.params.id);

    if (!tax) {
      return res.status(404).json({
        success: false,
        message: 'Tax not found',
      });
    }

    res.status(200).json({
      success: true,
      data: tax,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Category Status
export const toggleTaxStatus = async (req, res) => {
    try {
        const tax = await Tax.findById(req.params.id);
        if (!tax) return res.status(404).json({ message: "tax not found" });

        tax.status = !tax.status;
        await tax.save();

        res.status(200).json({ message: "tax status updated", status: tax.status });
    } catch (err) {
        console.error("Toggle Status Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// update
export const updateTax = async (req, res) => {
  try {
    const { name, taxType, tax } = req.body;

    const updatedTax = await Tax.findByIdAndUpdate(
      req.params.id,
      { name, taxType, tax },
      { new: true, runValidators: true }
    );

    if (!updatedTax) {
      return res.status(404).json({
        success: false,
        message: 'Tax not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tax updated successfully',
      data: updatedTax,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// delete
export const deleteTax = async (req, res) => {
  try {
    const deletedTax = await Tax.findByIdAndDelete(req.params.id);

    if (!deletedTax) {
      return res.status(404).json({
        success: false,
        message: 'Tax not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tax deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
