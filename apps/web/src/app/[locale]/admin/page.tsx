export default function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <ul>
        <li><a href="/admin/products">Products</a></li>
        <li><a href="/admin/orders">Orders</a></li>
        <li><a href="/admin/subscriptions">Subscriptions</a></li>
        <li><a href="/admin/revenue">Revenue</a></li>
      </ul>
    </div>
  );
}
