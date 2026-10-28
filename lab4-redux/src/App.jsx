import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { productAdded, productUpdated, productDeleted, productsErrorSet, productsErrorCleared } from './features/products/productsSlice';
import { taskAdded, taskUpdated, taskDeleted, tasksErrorSet, tasksErrorCleared } from './features/tasks/tasksSlice';

function ProductPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, error } = useSelector((state) => state.products);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('nameAsc');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Периферия', price: '0', stock: '0' });
  const visible = useMemo(() => items.filter((p) => (p.name + ' ' + p.category).toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'priceAsc' ? a.price - b.price : sort === 'priceDesc' ? b.price - a.price : a.name.localeCompare(b.name)), [items, query, sort]);
  function reset() { setForm({ name: '', category: 'Периферия', price: '0', stock: '0' }); setEditing(null); dispatch(productsErrorCleared()); }
  function submit(event) {
    event.preventDefault();
    const price = Number(form.price); const stock = Number(form.stock);
    if (!form.name.trim() || !Number.isFinite(price) || price < 0 || !Number.isInteger(stock) || stock < 0) {
      dispatch(productsErrorSet(t('validation'))); return;
    }
    const data = { name: form.name.trim(), category: form.category.trim() || 'Другое', price, stock };
    if (editing) dispatch(productUpdated({ id: editing, changes: data })); else dispatch(productAdded(data));
    reset();
  }
  function startEdit(product) { setEditing(product.id); setForm({ name: product.name, category: product.category, price: String(product.price), stock: String(product.stock) }); }
  return <section className="page">
    <div className="page-heading"><div><p className="eyebrow">REDUX SLICE / CRUD</p><h1>{t('productsTitle')}</h1><p className="muted">Create · Read · Update · Delete</p></div><span className="count">{items.length} {t('productCount').toLowerCase()}</span></div>
    <form className="panel form-grid" onSubmit={submit} noValidate>
      <h2 className="form-title">{editing ? t('editTitle') : t('addProduct')}</h2>
      <label>{t('name')}<input value={form.name} maxLength="100" onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Например, монитор" /></label>
      <label>{t('category')}<input value={form.category} maxLength="60" onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
      <label>{t('price')}<input type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></label>
      <label>{t('stock')}<input type="number" min="0" step="1" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></label>
      {error && <p className="error full">{error}</p>}
      <div className="form-actions full"><button className="primary" type="submit">{t('save')}</button>{editing && <button type="button" className="secondary" onClick={reset}>{t('cancel')}</button>}</div>
    </form>
    <div className="toolbar"><input aria-label={t('search')} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('search')} /><label className="sort-label">{t('sort')}<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="nameAsc">{t('nameAsc')}</option><option value="priceAsc">{t('priceAsc')}</option><option value="priceDesc">{t('priceDesc')}</option></select></label></div>
    <div className="product-grid">{visible.map((p) => <article className="item-card" key={p.id}><div className="card-top"><span className="tag">{p.category}</span><span className="stock">{t('stock')}: {p.stock}</span></div><h3>{p.name}</h3><p className="price">{p.price.toLocaleString()} ₽</p><div className="card-actions"><button className="secondary" onClick={() => startEdit(p)}>{t('edit')}</button><button className="danger" onClick={() => window.confirm(t('deleteConfirm')) && dispatch(productDeleted(p.id))}>{t('delete')}</button></div></article>)}</div>
    {visible.length === 0 && <div className="empty">{t('empty')}</div>}
  </section>;
}

function TasksPage() {
  const { t } = useTranslation(); const dispatch = useDispatch();
  const { items, error } = useSelector((state) => state.tasks);
  const [query, setQuery] = useState(''); const [title, setTitle] = useState(''); const [description, setDescription] = useState('');
  const visible = items.filter((item) => (item.title + ' ' + item.description).toLowerCase().includes(query.toLowerCase()));
  function submit(e) { e.preventDefault(); if (!title.trim()) { dispatch(tasksErrorSet(t('validation'))); return; } dispatch(taskAdded({ title: title.trim(), description: description.trim() })); setTitle(''); setDescription(''); dispatch(tasksErrorCleared()); }
  return <section className="page">
    <div className="page-heading"><div><p className="eyebrow">REDUX SLICE / CRUD</p><h1>{t('tasksTitle')}</h1><p className="muted">Create · Read · Update · Delete</p></div><span className="count">{items.filter((x) => x.done).length}/{items.length} {t('completed').toLowerCase()}</span></div>
    <form className="panel task-form" onSubmit={submit}><label>{t('name')}<input value={title} maxLength="140" onChange={(e) => setTitle(e.target.value)} placeholder="Что нужно сделать?" /></label><label>{t('description')}<input value={description} maxLength="240" onChange={(e) => setDescription(e.target.value)} placeholder="Краткое описание (необязательно)" /></label>{error && <p className="error">{error}</p>}<button className="primary" type="submit">{t('addTask')}</button></form>
    <div className="toolbar"><input aria-label={t('search')} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('search')} /></div>
    <div className="task-list">{visible.map((task) => <article className={'task-card ' + (task.done ? 'is-done' : '')} key={task.id}><button className="check" aria-label={t('markDone')} onClick={() => dispatch(taskUpdated({ id: task.id, changes: { done: !task.done } }))}>{task.done ? '✓' : '○'}</button><div className="task-content"><h3>{task.title}</h3>{task.description && <p>{task.description}</p>}<span className="muted">{task.done ? t('done') : t('open')}</span></div><button className="danger" onClick={() => window.confirm(t('deleteConfirm')) && dispatch(taskDeleted(task.id))}>{t('delete')}</button></article>)}</div>
    {visible.length === 0 && <div className="empty">{t('empty')}</div>}
  </section>;
}

function Overview() {
  const { t } = useTranslation(); const products = useSelector((s) => s.products.items); const tasks = useSelector((s) => s.tasks.items);
  return <section className="hero"><p className="eyebrow">HUMAN–COMPUTER INTERACTION · LAB 04</p><h1>{t('heading')}</h1><h2>{t('intro')}</h2><p className="hero-copy">{t('overviewText')}</p><div className="stat-grid"><div className="stat panel"><span>{t('productCount')}</span><strong>{products.length}</strong><small>products slice</small></div><div className="stat panel"><span>{t('taskCount')}</span><strong>{tasks.length}</strong><small>tasks slice</small></div><div className="stat panel"><span>{t('completed')}</span><strong>{tasks.filter((x) => x.done).length}</strong><small>derived selector</small></div></div><div className="hero-links"><NavLink className="primary link-button" to="/products">{t('products')} ↗</NavLink><NavLink className="secondary link-button" to="/tasks">{t('tasks')} ↗</NavLink></div><p className="note">Redux Toolkit · React Redux hooks · React Router · i18next</p></section>;
}

export default function App() {
  const { t, i18n } = useTranslation();
  return <div className="app-shell"><header className="topbar"><NavLink to="/" className="brand"><span className="brand-mark">R</span><span>{t('brand')}<small>{t('subtitle')}</small></span></NavLink><nav aria-label="Main navigation"><NavLink to="/">{t('overview')}</NavLink><NavLink to="/products">{t('products')}</NavLink><NavLink to="/tasks">{t('tasks')}</NavLink></nav><label className="language"><span>{t('language')}</span><select value={i18n.language.startsWith('en') ? 'en' : 'ru'} onChange={(e) => i18n.changeLanguage(e.target.value)}><option value="ru">{t('ru')}</option><option value="en">{t('en')}</option></select></label></header><main><Routes><Route path="/" element={<Overview />} /><Route path="/products" element={<ProductPage />} /><Route path="/tasks" element={<TasksPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main><footer><span>HCI · LAB 04</span><span>React + Redux Toolkit</span></footer></div>;
}