export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      status: 200,
      message: "Products fetched successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed" });
  }
};